import axios from "axios";

export default {
  aws: {
    uploadFileToS3: (url: string, file: File) =>
      axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      }),
  },
};
