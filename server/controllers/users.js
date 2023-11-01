const postUser = (req, res) => {
  try {
    console.log(req.body);
    return res.json({ success: true, message: "Logged in sucessfully" });
  } catch (error) {
    console.log(error);
    return res.json({ success: true, message: "error" });
  }
};

module.exports = {
  postUser,
};
