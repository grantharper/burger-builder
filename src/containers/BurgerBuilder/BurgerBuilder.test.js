import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from "./BurgerBuilder";
import Burger from "../../components/Burger/Burger";

configure({adapter: new Adapter()});


describe('<BurgerBuilder />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onIngredientsInit={() => {}} />);
  });

  it('should render the <Burger /> component', () => {
    wrapper.setProps({
      ingredients: {
        salad: 0
      }
    });
    expect(wrapper.find(Burger)).toHaveLength(1);
  });

});