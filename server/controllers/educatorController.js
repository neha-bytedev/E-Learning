import {clerkClient} from '@clerk/express'
//update role to educator
export const updateRoleToEducator = async ()=>{
  try {
    const userId = req.auth.userId

    await clerkClient.users.updateUserMetadata(userId,{
      publicMetadata:{
        role: 'educator',
      }
    })
    resizeBy.json({success:true, message:'You can publish a new course now'})
  } catch (error) {
     res.json({success:false,message:error.message})
  }
}