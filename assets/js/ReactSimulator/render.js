
export const renderElement = (rootNode) => {
  if (rootNode.kind === 'text') {
    return document.createTextNode(rootNode.value); 
  }

  const elem = document.createElement(rootNode.tagname); 

  for (const att in (rootNode.props || {})) {
    elem[att] = rootNode.props[att];
  }

  (rootNode.childeren || []).forEach(child => {
    elem.appendChild(renderElement(child)); 
  });

  return elem; 
};