const express = require('express');
const lti = require('ltijs').Provider;
const Database = require('ltijs-sequelize');
const axios = require('axios');
const app = express();
const { Provider } = require('ltijs').Provider;

const { Database } = require('ltijs-sequelize');
iSpark


// Setup your existing variables
const canvasBaseUrl = 'https://hmh.instructure.com';
const accessToken = '3299~uTWSEuauW9Gv8pMwRrME6rTos6QOVh9Vp5pLBHO0OeG5vpg0OALm7VOr070kZGHH';
const courseId = '14706';

// Setup LTIjs provider
const db = new Database({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

lti.setup('LTIKEY', { plugin: db }, {
  appUrl: '/',
  loginUrl: '/login',
  sessionTimeoutUrl: '/sessiontimeout',
  invalidTokenUrl: '/invalidtoken'
});

lti.onConnect((connection, request, response) => {
  response.send('It\'s alive!');
});

// Setup routes
app.use(lti.app); // Add LTIjs routes to express
console.log(typeof lti.app); // Should log 'function'


lti.deploy({ serverless: true }); // Deploy serverless mode

// Register platform
lti.registerPlatform({
  url: 'https://canvas.instructure.com',
  name: 'Canvas',
  clientId: '32990000000000164',
  authenticationEndpoint: 'hhttps://hmh.instructure.com/api/lti/authorize?scope=openid&response_type=id_token&client_id=32990000000000164&redirect_uri=https%3A%2F%2Fapi.eng.hmhco.com%2Flti-deep-linking%2Fapi%2F1.3.0%2Flti&login_hint=b9733a07ee877b2374f569897fd85bcdb7662ce0&state=eyJraWQiOiJlZjdjZWY3Mi03ZWRmLTMxNjUtOWZhYi1mMmQ4OTEwNGNhYWIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2NhbnZhcy5pbnN0cnVjdHVyZS5jb20iLCJzdWIiOiIzMjk5MDAwMDAwMDAwMDE2NCIsImxvZ2luX2hpbnQiOiJiOTczM2EwN2VlODc3YjIzNzRmNTY5ODk3ZmQ4NWJjZGI3NjYyY2UwIiwibHRpX21lc3NhZ2VfaGludCI6ImV5SjBlWEFpT2lKS1YxUWlMQ0poYkdjaU9pSklVekkxTmlKOS5leUoyWlhKcFptbGxjaUk2SWpNNE5qY3hOVFE1TXpnM016ZzFPR0kyTnpRMVpUSXdNV0pqWmpKaE9HWTFObU5rT1dFNFpqYzJaR1l4WldNM05qY3dOVGxqWXpoaFpEYzNPR0kxT0dFeE0yUTJPV1kwWWpabU9EYzVZV1UyTkdJNE16SXdNelUwWVdRNE1qVmpaV0l3WkRjeE4yVXlZV1ZpT1ROaE9UazJPVGszT1dSbU5XRTBZMlZrTWpWaElpd2lZMkZ1ZG1GelgyUnZiV0ZwYmlJNkltaHRhQzVwYm5OMGNuVmpkSFZ5WlM1amIyMGlMQ0pqYjI1MFpYaDBYM1I1Y0dVaU9pSkRiM1Z5YzJVaUxDSmpiMjUwWlhoMFgybGtJam96TWprNU1EQXdNREF3TURBeE5EY3dOaXdpWTJGdWRtRnpYMnh2WTJGc1pTSTZJbVZ1SWl3aWFXNWpiSFZrWlY5emRHOXlZV2RsWDNSaGNtZGxkQ0k2ZEhKMVpTd2laWGh3SWpveE56QTNNVFV3T0RZMmZRLlVpY0NueEU2TnJKRkVrQnNxdm4wY2piMS1jN3BnQ3dvSm5RbGo2cnFQdmMiLCJ0YXJnZXRfbGlua191cmkiOiJodHRwczovL2FwaS5lbmcuaG1oY28uY29tL2x0aS1kZWVwLWxpbmtpbmcvYXBpLzEuMy4wL2x0aSIsImlzcyI6Imh0dHBzOi8vd3d3LmhtaGNvLmNvbSIsImV4cCI6MTcwNzE1MDU4ODQzOCwiaWF0IjoxNzA3MTUwNTY4NDM4LCJqdGkiOiJPREJrT0RjeVl6Y3RPV0UzTlMwek5qYzNMV0l6TURZdE9URXlNbUl6Tm1FeE1USmsifQ.Nx2vT1MbJlxtr-k4qhFWjUBA6DHTNlzOPibeGP6POhzwsjHf9a_AmibXm-UzDDCiNlpqOgDzCn15YI09g30kEB-tFmf0UtADRrinYVEYbycmtBelPIXxQszUR7tsnZ-a5KXDGCR15n-nUpqetL7Sd8BiQQHac5jWq2xlUg8J236TnbkZcgjA4CIgdRGnzCXrogrVABXYwgo_UYmmgNYRed3iVKhenL5W3MK_kOSh_fXQDvhcX1pvEq0LoMn1O-rb5BkG96aD2AZOUu5RuhTof3t2INYcuLXL_9plr3tgo2PkNEnEU2ABNItF28G7iRrkMga2Hm0XUgAJoIUjRqefJw&response_mode=form_post&nonce=a6ed1d77-84ee-3a16-bcad-acc9700f86f5&prompt=none&lti_message_hint=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXJpZmllciI6IjM4NjcxNTQ5Mzg3Mzg1OGI2NzQ1ZTIwMWJjZjJhOGY1NmNkOWE4Zjc2ZGYxZWM3NjcwNTljYzhhZDc3OGI1OGExM2Q2OWY0YjZmODc5YWU2NGI4MzIwMzU0YWQ4MjVjZWIwZDcxN2UyYWViOTNhOTk2OTk3OWRmNWE0Y2VkMjVhIiwiY2FudmFzX2RvbWFpbiI6ImhtaC5pbnN0cnVjdHVyZS5jb20iLCJjb250ZXh0X3R5cGUiOiJDb3Vyc2UiLCJjb250ZXh0X2lkIjozMjk5MDAwMDAwMDAxNDcwNiwiY2FudmFzX2xvY2FsZSI6ImVuIiwiaW5jbHVkZV9zdG9yYWdlX3RhcmdldCI6dHJ1ZSwiZXhwIjoxNzA3MTUwODY2fQ.UicCnxE6NrJFEkBsqvn0cjb1-c7pgCwoJnQlj6rqPvc',
  accesstokenEndpoint: 'https://platform.url/token',
  authConfig: { method: 'JWK_SET', key: 'https://platform.url/keys' }
});

// Placeholder for Deep Linking handling
lti.onDeepLinking(async (token, req, res) => {
    try {
        const deepLinking = lti.DeepLinking(token);
        const resource = deepLinking.createResource({
            type: 'ltiResourceLink',
            title: 'New Assignment with HMH Ed Linking Tool',
            url: 'https://example.com/my-content', // This would be your tool's launch URL
            customParams: { content_id: hmhEdLinkingTool.id }
        });
        
        const form = await deepLinking.createDeepLinkingForm([resource], {
            message: 'Deep Linking Content Successfully Created.'
        });
        res.send(form);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});

