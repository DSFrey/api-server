'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async read(id = null) {
    try {
      let record;
      if (id) {
        record = await this.model.findAll({ where: { id } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(json, id) {
    try {
      await this.model.update(json, { where: { id } });
      let record = await this.model.findAll({ where: { id } });
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({where:{id}});
      return 'Record Deleted';
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = ModelInterface;
