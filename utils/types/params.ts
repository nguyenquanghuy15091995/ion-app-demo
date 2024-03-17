import { ThemeDetail, Component, ComponentAttribute, LayoutType, ComponentType, Attribute } from "@prisma/client";

export type ComponentTypeRelation = Partial<ComponentType> & {
  attributes: Partial<Attribute>[];
}

export type ComponentRelation = Partial<Component> & {
  componentAttributes: Partial<ComponentAttribute>[];
  componentType: ComponentTypeRelation;
}

export type ThemeDetailRelation = Partial<ThemeDetail> & {
  components?: ComponentRelation[];
  layoutType?: LayoutType;
}