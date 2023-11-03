import React, { Fragment } from 'react';
const addKeyBlurAttributeRecursively = (element, keyblur, valueblur) => {
  const data = {};
  data[keyblur] = valueblur;
  if (React.isValidElement(element)) {
    // Clone the element and add keyblur attribute
    return React.cloneElement(element, { ...data, children: addKeyBlurToChildren(element.props.children, keyblur, valueblur) });
  }
  return element;
};

const addKeyBlurToChildren = (children, keyblur, valueblur) => {
  if (React.Children.count(children) > 0) {
    return React.Children.map(children, (child) => addKeyBlurAttributeRecursively(child, keyblur, valueblur));
  }
  return children;
};

const CustomComponent = (props) => {
  // 通过解构props获取组件的子元素和要添加的属性
  const { children, keyblur, valueblur } = props;

  return (
    <Fragment>
      {addKeyBlurToChildren(children, keyblur, valueblur)}
    </Fragment>
  );
};

export default CustomComponent;
