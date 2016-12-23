node ./test/api/create_test.js
mocha ./test/api/client/merchants-test.js
mocha ./test/api/client/merchant-{merchantname}-card-test.js
mocha ./test/api/client/merchants-{merchantname}-card-{cardID}-balance-test.js
mocha ./test/api/client/merchants-{merchantname}-card-{cardID}-giftload-test.js
mocha ./test/api/client/merchants-{merchantname}-card-{cardID}-giftredeem-test.js
mocha ./test/api/client/merchants-{merchantname}-cards-{cardID}-test.js
