import React from 'react';

class Form extends React.Component {
  state = {
    formState: {},
  };

  submitForm = cb => {
    cb(this.state.formState);
  };

  resetForm = () => {
    const newFormState = {};
    Object.keys(this.state.formState).forEach(key => {
      newFormState[key] = '';
    });
    console.log(newFormState);
    this.setState({
      formState: newFormState,
    });
  };

  handleItemChange = name => {
    return value => {
      this.setState(prevState => {
        return {
          formState: {
            ...prevState.formState,
            [name]: value,
          },
        };
      });
    };
  };

  handleFormItemValueChange = (name, value) => {
    this.setState(prevState => {
      return {
        formState: {
          ...prevState.formState,
          [name]: value,
        },
      };
    });
  };

  render() {
    const { children } = this.props;
    const renderChildren = [];
    React.Children.forEach(children, child => {
      if (child.type.displayName === 'FormItem') {
        const { name } = child.props;
        const Children = React.cloneElement(child, {
          key: name,
          onChange: this.handleFormItemValueChange,
          value: this.state.formState[name] || '',
          name,
        });
        renderChildren.push(Children);
      }
    });
    return renderChildren;
  }
}

function FormItem(props) {
  const { name, label, children, value, onChange } = props;

  const handleChange = value => {
    onChange(name, value);
  };

  return (
    <div>
      <span>{label}: </span>
      {React.isValidElement(children) &&
        children.type.displayName === 'Input' &&
        React.cloneElement(children, { onChange: handleChange, value })}
    </div>
  );
}

FormItem.displayName = 'FormItem';

function Input(props) {
  const { value, onChange } = props;
  return (
    <input type="text" value={value} onChange={e => onChange(e.target.value)} />
  );
}

Input.displayName = 'Input';

const Demo = () => {
  const form = React.useRef(null);
  const submit = () => {
    /* 表单提交 */
    form.current.submitForm(formValue => {
      console.log(formValue);
    });
  };
  const reset = () => {
    /* 表单重置 */
    form.current.resetForm();
  };
  return (
    <div className="box">
      <Form ref={form}>
        <FormItem name="name" label="我是">
          <Input />
        </FormItem>
        <FormItem name="mes" label="我想对大家说">
          <Input />
        </FormItem>
        <input placeholder="不需要的input" />
        <Input />
      </Form>
      <div className="btns">
        <button className="searchbtn" onClick={submit}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
    </div>
  );
};

export default Demo;
