import cx from "classnames";
import Image from "next/image";
import * as React from "react";

import IconHouseCheck from "./icons/IconHouseCheck";
import imageSuccess from "./images/success.png";
import styles from "./index.module.scss";

import { formatLovelaceAmount } from "@/modules/bigint-utils";
import { LovelaceAmount } from "@/modules/business-types";
import Button from "@/modules/teiki-ui/components/Button";
import Flex from "@/modules/teiki-ui/components/Flex";
import Modal from "@/modules/teiki-ui/components/Modal";
import Title from "@/modules/teiki-ui/components/Title";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  open: boolean;
  onClose?: () => void;
  // props for displaying
  lovelaceAmount?: LovelaceAmount;
  projectName?: string;
};

export default function ModalSuccess({
  className,
  style,
  open,
  onClose,
  lovelaceAmount,
  projectName,
}: Props) {
  return (
    <Modal
      className={cx(styles.container, className)}
      style={style}
      open={open}
      onClose={onClose}
      closeOnDimmerClick
      closeOnEscape
    >
      <Modal.Content padding="none">
        <Flex.Col alignItems="center" padding="64px 32px">
          <Image
            className={styles.imageSuccess}
            src={imageSuccess}
            alt="niko firework"
          />
          <Title
            className={styles.caption}
            size="h1"
            color="ink"
            content="Thank You for Your Backing"
          />
          {lovelaceAmount != null ? (
            <div className={styles.backedAmount}>
              <span>{"You have staked "}</span>
              <span className={styles.emphasis}>
                {formatLovelaceAmount(lovelaceAmount, {
                  includeCurrencySymbol: true,
                })}
              </span>
            </div>
          ) : null}
          <Button.Solid
            className={styles.button}
            icon={<IconHouseCheck />}
            onClick={onClose}
          >
            Close
          </Button.Solid>
        </Flex.Col>
      </Modal.Content>
    </Modal>
  );
}
