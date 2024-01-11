import { Skeleton } from "@mantine/core";
import styles from "../styles/ProductListSkeleton.module.css";

function ProductListSkeleton() {
  return (
    <div className={styles.productSkeleton}>
      <Skeleton height={400} width={400} />
      <Skeleton height={25} width={300} />
      <Skeleton height={25} width={50} />
    </div>
  );
}

export default ProductListSkeleton;
