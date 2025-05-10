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
  const user = await prisma.user.create({
    data:{email,name,about,profilePicture}
  });
  return res.json({msg:"Success",status:true,user})
} catch (error) {
  next(error)
}
  } 

  export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();

    // Fetch users with selected fields and order by name
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email:true,
        name: true,
        profilePicture: true,
        about: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    // Group users by the first letter of their name
    const groupedUsersbyinitialLeter = users.reduce((acc, user) => {
      const firstLetter = user.name.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(user);
      return acc;
    }, {});

    return res.status(200).send({users : groupedUsersbyinitialLeter });
  } catch (error) {
    console.error("Error in getAllUsersGrouped:", error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};
