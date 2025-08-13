// components/Sidebar/MobileSidebar.tsx
import { useContext, useMemo } from "react";
import { Drawer, Menu } from "antd";
import type { MenuProps } from "antd";
import { SidebarContext } from "../../Context/SidebarContext";
import { SectorContext } from "../../Context/SectorsContext";
import { buildSectorMenuItems } from "../../Utils/buildSectorMenuItems";

type MenuItem = Required<MenuProps>["items"][number];

const MobileSidebar = () => {
  const { open, setOpen } = useContext(SidebarContext);
  const { sectors, selectedSector, setSelectedSector } = useContext(SectorContext);

const items: MenuItem[] = useMemo(() => buildSectorMenuItems(sectors), [sectors]);


  const selectedKeys = selectedSector ? [`sector:${selectedSector}`] : [];

  const onClick: MenuProps["onClick"] = (e) => {
    const [, sectorKey] = (e.key as string).split("sector:");
    if (sectorKey) {
      setSelectedSector(sectorKey);
      setOpen(false); // close drawer after selection
    }
  };

  return (
    <Drawer
      title="القائمة"
      placement="right"
      closable
      onClose={() => setOpen(false)}
      open={open}
    >
      <Menu
        mode="inline"
        items={items}
        onClick={onClick}
        selectedKeys={selectedKeys}
        className="break-words whitespace-normal"
      />
    </Drawer>
  );
};

export default MobileSidebar;
