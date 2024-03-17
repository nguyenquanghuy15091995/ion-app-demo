-- CreateTable
CREATE TABLE `tb_layout_type` (
    `layout_type_code` VARCHAR(191) NOT NULL,
    `layout_type_name` VARCHAR(191) NOT NULL,
    `layout_type_description` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`layout_type_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_theme` (
    `theme_id` INTEGER NOT NULL AUTO_INCREMENT,
    `theme_name` VARCHAR(191) NOT NULL,
    `theme_description` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`theme_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_theme_detail` (
    `theme_detail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `theme_detail_position` INTEGER NOT NULL DEFAULT 0,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `theme_id` INTEGER NOT NULL,
    `layout_type_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`theme_detail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_component_type` (
    `comp_type_code` VARCHAR(191) NOT NULL,
    `comp_type_name` VARCHAR(191) NOT NULL,
    `comp_type_description` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`comp_type_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_attribute` (
    `attr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `attr_name` VARCHAR(191) NOT NULL,
    `attr_description` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `comp_type_code` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`attr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_component` (
    `comp_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comp_name` VARCHAR(191) NOT NULL,
    `comp_description` VARCHAR(191) NULL,
    `comp_position` INTEGER NOT NULL DEFAULT 0,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,
    `comp_type_code` VARCHAR(191) NOT NULL,
    `theme_detail_id` INTEGER NOT NULL,

    PRIMARY KEY (`comp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_component_attribute` (
    `attr_id` INTEGER NOT NULL,
    `comp_id` INTEGER NOT NULL,
    `data_content` VARCHAR(191) NULL,
    `is_deleted` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `tb_component_attribute_attr_id_comp_id_key`(`attr_id`, `comp_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_theme_detail` ADD CONSTRAINT `tb_theme_detail_theme_id_fkey` FOREIGN KEY (`theme_id`) REFERENCES `tb_theme`(`theme_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_theme_detail` ADD CONSTRAINT `tb_theme_detail_layout_type_code_fkey` FOREIGN KEY (`layout_type_code`) REFERENCES `tb_layout_type`(`layout_type_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_attribute` ADD CONSTRAINT `tb_attribute_comp_type_code_fkey` FOREIGN KEY (`comp_type_code`) REFERENCES `tb_component_type`(`comp_type_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_component` ADD CONSTRAINT `tb_component_comp_type_code_fkey` FOREIGN KEY (`comp_type_code`) REFERENCES `tb_component_type`(`comp_type_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_component` ADD CONSTRAINT `tb_component_theme_detail_id_fkey` FOREIGN KEY (`theme_detail_id`) REFERENCES `tb_theme_detail`(`theme_detail_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_component_attribute` ADD CONSTRAINT `tb_component_attribute_comp_id_fkey` FOREIGN KEY (`comp_id`) REFERENCES `tb_component`(`comp_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
