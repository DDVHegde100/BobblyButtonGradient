const { useRef, useState, useEffect, createRef } = React;

const items = [
{
  name: "1",
  color: "#f44336",
  href: "#" },

{
  name: "2",
  color: "#e91e63",
  href: "#" },

{
  name: "3",
  color: "#9c27b0",
  href: "#" },

{
  name: "4",
  color: "#673ab7",
  href: "#" },

{
  name: "5",
  color: "#3f51b5",
  href: "#" }];





const Menu = ({ items }) => {
  const $root = useRef();
  const $indicator1 = useRef();
  const $indicator2 = useRef();
  const $items = useRef(items.map(createRef));
  const [active, setActive] = useState(0);

  const animate = () => {
    const menuOffset = $root.current.getBoundingClientRect();
    const activeItem = $items.current[active].current;
    const { width, height, top, left } = activeItem.getBoundingClientRect();

    const settings = {
      x: left - menuOffset.x,
      y: top - menuOffset.y,
      width: width,
      height: height,
      backgroundColor: items[active].color,
      ease: 'elastic.out(0.99, 0.5)',
      duration: 0.5 };


    gsap.to($indicator1.current, {
      ...settings });


    gsap.to($indicator2.current, {
      ...settings,
      duration: 2 });

  };

  useEffect(() => {
    animate();
    window.addEventListener('resize', animate);

    return () => {
      window.removeEventListener('resize', animate);
    };
  }, [active]);

  return /*#__PURE__*/(
    React.createElement("div", {
      ref: $root,
      className: "menu" },

    items.map((item, index) => /*#__PURE__*/
    React.createElement("a", {
      key: item.name,
      ref: $items.current[index],
      className: `item ${active === index ? 'active' : ''}`,
      onMouseEnter: () => {
        setActive(index);
      },
      href: item.href },

    item.name)), /*#__PURE__*/


    React.createElement("div", {
      ref: $indicator1,
      className: "indicator" }), /*#__PURE__*/

    React.createElement("div", {
      ref: $indicator2,
      className: "indicator" })));



};


/*--------------------
App
--------------------*/
const App = () => {
  return /*#__PURE__*/(
    React.createElement("div", { className: "App" }, /*#__PURE__*/
    React.createElement(Menu, { items: items })));


};


/*--------------------
Render
--------------------*/
ReactDOM.render( /*#__PURE__*/React.createElement(App, null),
document.getElementById("root"));