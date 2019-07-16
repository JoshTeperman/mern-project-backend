const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('joi')
require('./Program')
require('./Resource')

const projectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
  },
  resources: [{
    type: Schema.Types.ObjectId,
    ref: 'Resource'
  }],
  completed: {
    type: Boolean,
    default: true
  }
})

const Project = mongoose.model('Project', projectSchema)

const validateProject = (project) => {
  const schema = new Joi.object({
    name: Joi.string()
      .required(),
    description: Joi.string()
      .required(),
    category: Joi.string()
      .required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    program: Joi.string()
      .regex(/[0-9a-fA-F]{24}/),
    resources: Joi.array().items(Joi.string()
      .regex(/[0-9a-fA-F]{24}/)),
  })
  return Joi.validate(project, schema)
}

module.exports = {
  Project,
  validateProject
}
