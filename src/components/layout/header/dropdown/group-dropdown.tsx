"use client";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Dropdown, Avatar } from "@/components/ui";
import { DropdownOption } from "@/types/option";
import { User } from "@/types/user";
import IcArrow from "@/assets/icons/ic-arrow-down.svg";
import cn from "@/lib/cn";

interface dropdownProps {
  className?: string;
  isLogin: boolean;
  user?: User | null;
}

export function GroupDropdown({ className, isLogin = false, user }: dropdownProps) {
  const pathname = usePathname();

  const selectedGroup = useMemo<DropdownOption | null>(() => {
    const memberships = user?.memberships;
    if (!memberships?.length) return null;

    const pathSegments = pathname.split("/");
    const groupIdString =
      pathSegments[1] === "team" && pathSegments[2] ? pathSegments[2] : undefined;

    const currentMembership = groupIdString
      ? memberships.find(mb => String(mb.group.id) === groupIdString)
      : undefined;
    const group = currentMembership?.group ?? memberships[0].group;

    return {
      id: group.id,
      image: group.image,
      name: group.name,
    };
  }, [pathname, user?.memberships]);

  if (!isLogin || !selectedGroup) {
    return <></>;
  }

  return (
    <Dropdown className={cn(className, "w-[140px]")} size="md">
      <Dropdown.TriggerSelect
        size="md"
        intent="select"
        isIcon={true}
        className="w-[140px] gap-1 bg-gray-800 px-2"
      >
        <div className="flex w-[100px] items-center">
          <Avatar
            image={selectedGroup.image}
            shape="square"
            className="mr-1 h-[20px] w-[20px] shrink-0"
          />
          <span className="inline-block w-[80px] overflow-hidden text-ellipsis whitespace-nowrap break-all text-left">
            {selectedGroup.name}
          </span>
        </div>
        <IcArrow className="w-[24px]" />
      </Dropdown.TriggerSelect>
      <Dropdown.Menu className="w-[140px]" size="md">
        {user?.memberships &&
          user.memberships.map(mb => {
            return (
              <Dropdown.Option
                key={mb.group.id}
                size="md"
                option={mb.group}
                className="flex items-center gap-2 px-2"
                href={`/team/${mb.group.id}`}
                as="a"
              >
                <Avatar
                  image={mb.group.image}
                  shape="square"
                  className="h-[20px] w-[20px] shrink-0"
                />
                <span className="inline-block overflow-hidden text-ellipsis whitespace-nowrap break-all">
                  {mb.group.name}
                </span>
              </Dropdown.Option>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
