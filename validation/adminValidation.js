import joi from "joi";
export const jobPostSchema = joi.object({
  creatorId: joi.string().required(),
  companyName: joi.string().min(2).max(100).required(),
  position: joi.string().min(2).max(100).required(),
  contract: joi
    .string()
    .valid("full-time", "part-time", "contract", "internship")
    .required(),
  location: joi.string().min(2).max(200).required(),
});
export const updateJobPostSchema = joi
  .object({
    jobId: joi.string(), // Optional if the jobId is included in the URL or other part of the request
    companyName: joi.string().min(2).max(100),
    position: joi.string().min(2).max(100),
    contract: joi
      .string()
      .valid("full-time", "part-time", "contract", "internship"),
    location: joi.string().min(2).max(200),
  })
  .or("jobId", "companyName", "position", "contract", "location"); // Ensure at least one field is provided
