# OpenmoneyApi.RegisterRequest

## Properties
Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**stewardname** | **String** | Stewards name | 
**password** | **String** | Stewards password | 
**publicKey** | **String** | Stewards 1024bit - 4096bit RSA public key. command: openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:4096 ,openssl rsa -pubout -in private_key.pem -out public_key.pem , you can deterministically generate an RSA key from a passphrase http://crypto.stackexchange.com/questions/24514/deterministically-generate-a-rsa-public-private-key-pair-from-a-passphrase-with you can also use this service to generate a key online: http://travistidwell.com/blog/2013/09/06/an-online-rsa-public-and-private-key-generator/ | [optional] 
**email** | **String** | Stewards email address | [optional] 
**emailNotifications** | **Boolean** | Does steward wish to receive email notifications | [optional] 


