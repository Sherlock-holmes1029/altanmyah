// components/Sidebar/DesktopSidebar.tsx
import { useContext, useMemo } from "react";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { SectorContext } from "../../Context/SectorsContext";
import { buildSectorMenuItems } from "../../Utils/buildSectorMenuItems";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const DesktopSidebar = () => {
  const { sectors, selectedSector, setSelectedSector } = useContext(SectorContext);
  console.log(sectors)
  const items: MenuItem[] = useMemo(() => buildSectorMenuItems(sectors), [sectors]);


  const selectedKeys = selectedSector ? [`sector:${selectedSector}`] : [];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.keyPath?.length) {
      const [, sectorKey] = (e.key as string).split("sector:");
      if (sectorKey) setSelectedSector(sectorKey);
    }
  };

  return (
    <Sider width={260} theme="light">
      <Menu
        mode="inline"
        onClick={onClick}
        items={items}
        selectedKeys={selectedKeys}
        className="break-words whitespace-normal"
      />
    </Sider>
  );
};

export default DesktopSidebar;
