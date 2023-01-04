import { FC } from 'react';
import { truncatedMarkdown } from '../../pages/Postpage';
import './SideNavBar.css';


interface SideNavBarProps {
  list: truncatedMarkdown[]; 
  jumpFunction: (id: number) => void;
}

const SideNavBar: FC<SideNavBarProps> = (props:SideNavBarProps) => {
  const list = props.list;
  return (
    <aside className="SideNavBar">
      {list.map((item) => (
        <div className="SideNavBarItem" key={item.ID}>
          <a href={"#"} onClick={(e)=>{
            props.jumpFunction(Number(item.ID));
          }}>{item.Title}</a>
        </div>
      ))}
    </aside>
  );
};

export default SideNavBar;
