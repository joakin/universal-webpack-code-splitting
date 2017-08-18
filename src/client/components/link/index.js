export default (props, context) => {
  const { children, ...linkProps } = props;
  return (
    <a
      {...props}
      onClick={e => {
        e.preventDefault();
        context.history.push(props.href);
      }}
    >
      {children}
    </a>
  );
};
