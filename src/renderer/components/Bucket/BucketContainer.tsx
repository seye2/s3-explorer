import React from "react";
import { useObserver } from "mobx-react";

import { s3 } from "@renderer/context";

import Buckets from "./Buckets";

const BucketsContainer: React.FC = () =>
  useObserver(() => {
    const { bucketNames, bucketLoading, selectBucket } = s3.useStore();
    return (
      <Buckets
        bucketNames={bucketNames}
        loading={bucketLoading}
        onBucketClick={bucketName => {
          selectBucket(bucketName);
        }}
      ></Buckets>
    );
  });

export default BucketsContainer;
