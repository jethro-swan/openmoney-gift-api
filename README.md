## openmoney-gift-api

OpenMoney Gift API Service

The OpenMoney Gift API is a variant of the [OpenMoney API]https://github.com/jethro-swan/openmoney-api/ 
for use with the [OpenMoney Gift]https://github.com/jethro-swan/openmoney-gift/ interface.

### Install locally

```sh
git clone https://github.com/jethro-swan/openmoney-gift-api
cd openmoney-gift-api
npm install
cp sample.env .env
```

### Run in a background service
Install PM2 globally (if you have not done this already for OpenMoney API):
```sh
sudo npm install pm2 -g
```
Run OpenMoney Gift API service in the background:
```
pm2 start app.js --name "openmoney-gift-api"
```

### License

Copyright [2019] [Dominique Legault]

Minor revisions: 2019/11/03 - 2020/03/29 John Waters

  
Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
