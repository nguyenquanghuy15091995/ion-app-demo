"use client";

import { ComponentRelation } from "@/utils/types/params";
import ButtonNormal from "@/shared/button/ButtonNormal";
import ParagraphNormal from "../paragraph/ParagraphNormal";

type UIDynamicProps = {
  component: ComponentRelation;
}

const UIDynamic = ({ component }: UIDynamicProps) => {
  const componentType = component.componentType;
  if (componentType.code === "button_normal_1") {
    const buttonTextId = componentType.attributes.find(attr => attr.name === "button_text")?.id;
    const buttonAlertTextId = componentType.attributes.find(attr => attr.name === "button_alert_text")?.id;
    const buttonTextContent = component.componentAttributes.find(compAttr => compAttr.attributeId === buttonTextId)?.dataContent;
    const buttonAlertTextContent = component.componentAttributes.find(compAttr => compAttr.attributeId === buttonAlertTextId)?.dataContent;
    return (
      <ButtonNormal aria-label={buttonTextContent || ""} onClick={() => { alert(buttonAlertTextContent) }}>
        {buttonTextContent}
      </ButtonNormal>
    );
  }
  if (componentType.code === "paragraph_normal_1") {
    const paragraphAttrId = componentType.attributes.find(attr => attr.name === "content")?.id;
    const paragraphAttrContent = component.componentAttributes.find(compAttr => compAttr.attributeId === paragraphAttrId)?.dataContent;
    return (
      <>
        <ParagraphNormal aria-label={paragraphAttrContent || ""}>
          {paragraphAttrContent}
        </ParagraphNormal>
      </>
    );
  }
  return (
    <></>
  );
}

export default UIDynamic;
