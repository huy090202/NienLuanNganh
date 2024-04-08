export const adminMenu = [
  {
    // Quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.manage-admin",
        link: "/system/admin-admin",
      },
      {
        name: "menu.admin.manage-seller",
        link: "/system/user-seller",
      },
      {
        name: "menu.admin.user-user",
        link: "/system/user-user",
      },
      {
        // Quản lý sản phẩm
        name: "menu.seller.manage-product",
        link: "/seller/manage-product",
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

export const sellerMenu = [
  {
    name: "menu.admin.manage-user",
    menus: [
      {
        // Quản lý sản phẩm

        name: "menu.seller.manage-product",
        link: "/seller/manage-product",
      },
    ],
  },
];
