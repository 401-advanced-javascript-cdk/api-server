'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  get(_id) {
    let queryObject = _id ? {_id} : {};
    return this.schema.find(queryObject);
  }

  post(entry) {
    let newRecord = new this.schema(entry);
    return newRecord.save();
  }

  put(_id, entry) {
    try {
      console.log(_id, {...entry})
      return this.schema.findOneAndUpdate({_id}, {...entry});
    }
    catch(e) {
      console.log(e)
    };
  }

  delete(_id) {
    return this.schema.findOneAndRemove({_id})
  }
}
  
module.exports = Model;