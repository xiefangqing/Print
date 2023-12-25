//枚举需要被考虑的css属性
const fontStyle = [//这些属性会被继承
    "font",
    "color","fontSize","fontStretch","fontFamily","fontWeight",
    "textAlign","lineHeight","fontStyle","fontWeight",
    "wordWrap","wordSpacing","wordBreak","whiteSpace","fontVariant",
    "textShadow","textTransform","textSizeAdjust","textOrientation","textIndent",
    "textAlignLast","letterSpacing","lineBreak","listStyle",
];
const border = [
    "border",
    "borderBlock",
    "borderBlockColor",
    "borderBlockEnd",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth",
    "borderBlockStart",
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockStyle",
    "borderBlockWidth",
    "borderBottom",
    "borderBottomColor",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "borderBottomStyle",
    "borderBottomWidth",
    "borderCollapse",
    "borderColor",
    "borderEndEndRadius",
    "borderEndStartRadius",
    "borderImage",
    "borderImageOutset",
    "borderImageRepeat",
    "borderImageSlice",
    "borderImageSource",
    "borderImageWidth",
    "borderInline",
    "borderInlineColor",
    "borderInlineEnd",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth",
    "borderInlineStart",
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineStyle",
    "borderInlineWidth",
    "borderLeft",
    "borderLeftColor",
    "borderLeftStyle",
    "borderLeftWidth",
    "borderRadius",
    "borderRight",
    "borderRightColor",
    "borderRightStyle",
    "borderRightWidth",
    "borderSpacing",
    "borderStartEndRadius",
    "borderStartStartRadius",
    "borderStyle",
    "borderTop",
    "borderTopColor",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderTopStyle",
    "borderTopWidth",
    "borderWidth",

]
const boxStyle = [
    "overflowAnchor","overflowWrap","overflow","overflowX","overflowY","textOverflow","textDecoration",
    "visibility","zoom","zIndex","objectFit","objectPosition","verticalAlign",
    "inset","left","right","bottom","top","opacity","boxShadow","boxSizing",
    "width","height","maxHeight","maxWidth","minHeight","minWidth",
    "flex","flexBasis","flexDirection","flexFlow","flexGrow","flexShrink","flexWrap",
    "justifyContent","justifyItems","justifySelf","order","direction",
    "float","display","alignItems","alignContent","alignSelf","alignmentBaseline",
    "background", "backgroundColor", "backgroundImage", "backgroundPosition", "backgroundSize","backgroundRepeat",
    "backgroundAttachment","backgroundBlendMode","backgroundClip","backgroundOrigin","backgroundPositionX","backgroundPositionY",
    "margin","marginBottom","marginLeft","marginRight","marginTop",
    "padding","paddingBottom","paddingLeft","paddingRight","paddingTop",
    "perspective","perspectiveOrigin","transform","transformBox","transformOrigin","transformStyle",
    "content","clip","clipPath","clipRule","clear","outline"
];
export default [
    ...fontStyle,
    ...border,
    ...boxStyle
]