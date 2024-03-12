export const adminMenu = [
  {
    // Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/admin-admin",
      },
      {
        name: "menu.admin.manage-seller",
        link: "/system/user-seller",
        // subMenus: [
        //   {
        //     name: "menu.system.system-administrator.user-manage",
        //     link: "/system/user-manage",
        //   },
        //   {
        //     name: "menu.system.system-administrator.user-redux",
        //     link: "/system/user-redux",
        //   },
        // ],
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.product-redux",
        link: "/system/product-redux",
      },
    ],
  },
  {
    // Quản lý shop
    name: "menu.admin.shop",
    menus: [
      {
        name: "menu.admin.manage-shop",
        link: "/system/manage-shop",
      },
    ],
  },
  {
    // Quản lý danh mục
    name: "menu.admin.catalog",
    menus: [
      {
        name: "menu.admin.manage-catalog",
        link: "/system/manage-catalog",
      },
    ],
  },
  {
    // Quản lý phân quyền
    name: "menu.admin.permission",
    menus: [
      {
        name: "menu.admin.manage-permission",
        link: "/system/manage-permission",
      },
    ],
  },
];
