import cx from "classnames";
import Image$Next from "next/image";
import * as React from "react";

import WithAspectRatio from "../../../../components/WithAspectRatio";
import { Image, PaletteItem } from "../../kolours-types";
import { toHexColor } from "../../utils";

import PaletteCell from "./components/PaletteCell";
import styles from "./index.module.scss";

import Button from "@/modules/teiki-ui/components/Button";
import Flex from "@/modules/teiki-ui/components/Flex";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  initialImage: Image;
  palette: PaletteItem[];
};

/** @deprecated use PanelMint instead */
export default function PanelMintKolours({
  className,
  style,
  initialImage,
  palette,
}: Props) {
  const [selection, setSelection] = React.useState<Record<number, boolean>>({});

  return (
    <div className={cx(styles.container, className)} style={style}>
      <Flex.Col>
        <Flex.Row
          flexWrap="wrap"
          padding="24px"
          gap="32px"
          alignItems="stretch"
        >
          <Flex.Cell flex="1 1 300px">
            <WithAspectRatio aspectRatio={1}>
              <Image$Next src={initialImage.src} alt="" fill />
              {palette.map((item, index) => (
                <Image$Next
                  style={{
                    visibility: selection[index] ? "visible" : "hidden",
                  }}
                  key={index}
                  src={item.image.src}
                  alt=""
                  fill
                />
              ))}
            </WithAspectRatio>
          </Flex.Cell>
          <Flex.Cell flex="1 1 300px">
            <div className={styles.grid}>
              {palette.map((item, index) => (
                <PaletteCell
                  key={index}
                  color={toHexColor(item.kolour)}
                  minted={item.status !== "free"} // TODO: distinguish booked and minted
                  checked={selection[index]}
                  fill
                  onCheckedChange={(checked) => {
                    setSelection((selection) => ({
                      ...selection,
                      [index]: checked,
                    }));
                  }}
                />
              ))}
            </div>
          </Flex.Cell>
        </Flex.Row>
        <Button.Solid
          content="Mint"
          onClick={() => {
            alert(JSON.stringify(selection));
          }}
        />
      </Flex.Col>
    </div>
  );
}
