import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database

export const clerkWebhooks = async (req, res)=>{
  try {
 const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

// Step 1: Signature verify on raw body
whook.verify(req.body, {
  "svix-id": req.headers["svix-id"],
  "svix-timestamp": req.headers["svix-timestamp"],
  "svix-signature": req.headers["svix-signature"]
});

// Step 2: Parse raw body to JSON
const { data, type } = JSON.parse(req.body.toString("utf8"));

   
   switch (type) {
    case 'user.created':{
      const userData = {
        _id: data.id,
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      }
      await User.create(userData)
      res.json({})
      break;
    }
      
     case 'user.updated' :{
      const userData = {
        email: data.email_addresses[0].email_address,
        name: data.first_name + " " + data.last_name,
        imageUrl: data.image_url,
      }
      await User.findByIdAndUpdate(data.id, userData)
      res.json({})
      break;
     } 

     case 'user.deleted': {
      await User.findByIdAndDelete(data.id)
      res.json({})
      break;
     }
     default:
      break;
   }

  } catch (error) {
     res.json({success: false, message: error.message})
  }
}