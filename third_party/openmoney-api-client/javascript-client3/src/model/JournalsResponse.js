/**
 * Openmoney API
 * Openmoney API
 *
 * OpenAPI spec version: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.OpenmoneyApi) {
      root.OpenmoneyApi = {};
    }
    root.OpenmoneyApi.JournalsResponse = factory(root.OpenmoneyApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The JournalsResponse model module.
   * @module model/JournalsResponse
   * @version 2.0.0
   */

  /**
   * Constructs a new <code>JournalsResponse</code>.
   * @alias module:model/JournalsResponse
   * @class
   * @param toAccount {String} 
   * @param toAccountNamespace {String} 
   * @param amount {Number} 
   */
  var exports = function(toAccount, toAccountNamespace, amount) {
    var _this = this;

    _this['to_account'] = toAccount;
    _this['to_account_namespace'] = toAccountNamespace;




    _this['amount'] = amount;



  };

  /**
   * Constructs a <code>JournalsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JournalsResponse} obj Optional instance to populate.
   * @return {module:model/JournalsResponse} The populated <code>JournalsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('to_account')) {
        obj['to_account'] = ApiClient.convertToType(data['to_account'], 'String');
      }
      if (data.hasOwnProperty('to_account_namespace')) {
        obj['to_account_namespace'] = ApiClient.convertToType(data['to_account_namespace'], 'String');
      }
      if (data.hasOwnProperty('from_account')) {
        obj['from_account'] = ApiClient.convertToType(data['from_account'], 'String');
      }
      if (data.hasOwnProperty('from_account_namespace')) {
        obj['from_account_namespace'] = ApiClient.convertToType(data['from_account_namespace'], 'String');
      }
      if (data.hasOwnProperty('currency')) {
        obj['currency'] = ApiClient.convertToType(data['currency'], 'String');
      }
      if (data.hasOwnProperty('currency_namespace')) {
        obj['currency_namespace'] = ApiClient.convertToType(data['currency_namespace'], 'String');
      }
      if (data.hasOwnProperty('amount')) {
        obj['amount'] = ApiClient.convertToType(data['amount'], 'Number');
      }
      if (data.hasOwnProperty('created')) {
        obj['created'] = ApiClient.convertToType(data['created'], 'Number');
      }
      if (data.hasOwnProperty('created_by')) {
        obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
      }
      if (data.hasOwnProperty('payload')) {
        obj['payload'] = ApiClient.convertToType(data['payload'], Object);
      }
    }
    return obj;
  }

  /**
   * @member {String} to_account
   */
  exports.prototype['to_account'] = undefined;
  /**
   * @member {String} to_account_namespace
   */
  exports.prototype['to_account_namespace'] = undefined;
  /**
   * @member {String} from_account
   */
  exports.prototype['from_account'] = undefined;
  /**
   * @member {String} from_account_namespace
   */
  exports.prototype['from_account_namespace'] = undefined;
  /**
   * @member {String} currency
   */
  exports.prototype['currency'] = undefined;
  /**
   * @member {String} currency_namespace
   */
  exports.prototype['currency_namespace'] = undefined;
  /**
   * @member {Number} amount
   */
  exports.prototype['amount'] = undefined;
  /**
   * @member {Number} created
   */
  exports.prototype['created'] = undefined;
  /**
   * stewardname of who created entry
   * @member {String} created_by
   */
  exports.prototype['created_by'] = undefined;
  /**
   * @member {Object} payload
   */
  exports.prototype['payload'] = undefined;



  return exports;
}));


