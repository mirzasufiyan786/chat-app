import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.json({ status: false, message: "Email is required" });
      }
  
      const prisma = getPrismaInstance();
  
      const user = await prisma.user.findUnique({
        where: { email },
      });
  
      if (!user) {
        return res.json({ status: false ,message: "User is not found"}); 
      } else {
        return res.status(200).json({ status: true, data:user,message: "User found" });
      }
    } catch (error) {
      console.error("Error in checkUser:", error);
      return res.status(500).json({ status: false, message: "Internal server error" });
    }
  };

  export const onBoardUser = async (req,res,next)=>{
try {
  const {email,name,about,image:profilePicture} = req.body;
  if(!email || !name || !profilePicture){
    return res.send("Name Email and Image are required")
  }
  const prisma = getPrismaInstance();
  await prisma.user.create({
    data:{email,name,about,profilePicture}
  });
  return res.json({msg:"Success",status:true})
} catch (error) {
  next(error)
}
  } 