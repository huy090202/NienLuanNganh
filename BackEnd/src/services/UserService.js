const User = require("../models/UserModel");
const Role = require("../models/RoleModel");
const bcrypt = require("bcrypt");
const { genneralAccessToken, genneralRefreshToken } = require("./JwtService");

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      address,
      city,
      gender,
      roleId,
      avatar,
    } = newUser;

    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "The email is already",
        });
      }

      if (password !== confirmPassword) {
        resolve({
          status: "ERR",
          message: "The password and confirmPassword is not match",
        });
      }

      const hash = bcrypt.hashSync(password, 10);
      const createdUser = await User.create({
        name,
        email,
        password: hash,
        phone,
        address,
        city,
        gender,
        roleId,
        avatar,
      });

      if (createdUser) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createdUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparePassword = await bcrypt.compareSync(
        password,
        checkUser.password
      );

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await genneralAccessToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      const refresh_token = await genneralRefreshToken({
        id: checkUser.id,
        isAdmin: checkUser.isAdmin,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
        // Khi dung access_token thi xoa checkUser
        checkUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const updatedUser = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
        useFindAndModify: false,
      });

      if (!updatedUser) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      if (!data.roleId || !data.gender) {
        resolve({
          status: "ERR",
          message: "roleId or gender is not defined",
        });
      }

      // Check avatar
      if (data.avatar) {
        updatedUser.avatar = data.avatar;
      }

      resolve({
        status: "OK",
        message: "Update the user success",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: userId,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      await User.findByIdAndDelete(userId);
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const deleteManyUser = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      await User.deleteMany({ _id: ids });
      resolve({
        status: "OK",
        message: "Delete user success",
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
        // Neu password: 0 thi khong tra ve password
        // Neu password: 1 thi tra ve password
        users = await User.find({}, { password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }
      if (userId && userId !== "All") {
        users = await User.findOne({ _id: userId }, { password: 0 });
      }

      resolve({
        status: "OK",
        message: "Success",
        users,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllStaffs = (staffId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let staffs = "";
      if (staffId === "All") {
        staffs = await User.find({ roleId: "R2" }, { password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (staffId && staffId !== "All") {
        staffs = await User.findOne({ _id: staffId }, { password: 0 });
      }

      resolve({
        status: "OK",
        message: "Success",
        staffs,
      });
    } catch (e) {
      reject(e);
    }
  });
}

const getAllAdmins = (adminId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let admins = "";
      if (adminId === "All") {
        admins = await User.find({ roleId: "R3" }, { password: 0 }).sort({
          createdAt: -1,
          updatedAt: -1,
        });
      }

      if (adminId && adminId !== "All") {
        admins = await User.findOne({ _id: adminId }, { password: 0 });
      }

      resolve({
        status: "OK",
        message: "Success",
        admins,
      });
    } catch (e) {
      reject(e);
    }
  });
}

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({
        _id: id,
      });
      if (user === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      resolve({
        status: "OK",
        message: "SUCESS",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const roleUser = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          status: "ERR",
          message: "The roleName is required",
        });
      }
      const dataRole = await Role.find({ roleName: typeInput });
      resolve({
        status: "OK",
        message: "SUCCESS",
        data: dataRole,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser,
  deleteManyUser,
  roleUser,
  getAllStaffs,
  getAllAdmins
};
