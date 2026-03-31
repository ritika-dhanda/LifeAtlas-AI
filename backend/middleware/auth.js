const auth = require("../middleware/auth");
const User = require("../models/User");

router.get("/profile", auth, async (req, res) => {

  try {

    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Server error"
    });

  }

});
