export const createElement = (
  tagname,
  props,
  ...childeren
) => {
  const key = props.key; 
  delete props.key;
  return { kind: 'element', tagname, props, childeren, key }; 
};


export const createText = (value, key = '') => ({
  key, 
  kind: 'text', 
  value: value.toString() 
});