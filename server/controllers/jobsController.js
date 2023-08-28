import Job from '../models/Jobs.js'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const createJob = async (req, res) => {
  const {position, company} = req.body
  if(!position || !company){
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(201).json({job})
}
const deleteJob = async (req, res) => {
  res.send('Delete job')
}
const getAllJobs = async (req, res) => {
  res.send('get all jobs')
}
const updateJob = async (req, res) => {
  res.send('update job')
}
const showStats = async (req, res) => {
  res.send('show stats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
