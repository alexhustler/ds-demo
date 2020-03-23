import httpService from "../http-service";

const mapResponseToPayload = (res: any) => res.data;

const { axios, axiosWithoutInterceptors } = httpService;

export default {
  admin: {
    fetchUsersForAdmin: () =>
      axios.get(`/api/admin/users`).then(mapResponseToPayload),
    fetchAppStates: () =>
      axios.get(`/api/admin/app-states`).then(mapResponseToPayload),
    updateUserForAdmin: (updatedUserForm: any) =>
      axios
        .put("/api/admin/user", { updatedUserForm })
        .then(mapResponseToPayload),
    setAppStateWorkerProcessLock: (isLockWorkerProcess: boolean) =>
      axios
        .put(`/api/admin/app-states/worker-process-lock`, {
          isLockWorkerProcess,
        })
        .then(mapResponseToPayload),
  },

  auth: {
    register: (
      emailAddress: string,
      password: string,
      firstName: string,
      lastName: string
    ) =>
      axiosWithoutInterceptors
        .post("/api/authentication/register", {
          emailAddress,
          password,
          firstName,
          lastName,
        })
        .then(mapResponseToPayload),

    login: (emailAddress: string, password: string) =>
      axiosWithoutInterceptors
        .post("/api/authentication/login", {
          emailAddress,
          password,
        })
        .then(mapResponseToPayload),

    logout: () => axios.post("/api/authentication/logout", {}),

    validateSessionCookie: () =>
      axios.post("/api/authentication/validate", {}).then(mapResponseToPayload),

    changePassword: (
      userId: number,
      currentPassword: string,
      newPassword: string
    ) =>
      axios
        .put("/api/authentication/password", {
          userId,
          currentPassword,
          newPassword,
        })
        .then(mapResponseToPayload),
  },

  users: {
    createPresignedS3Url: (
      fileName: string,
      fileType: string,
      filePurpose:
        | "directMailTemplateBackgroundImage"
        | "userAutoDialerRecording"
        | "userLogoImage"
        | "userProfileImage"
    ) =>
      axios
        .post(`/api/users/s3-url`, { fileName, fileType, filePurpose })
        .then(mapResponseToPayload),
    updateUserSettings: (userId: number) =>
      axios
        .put("/api/users", {
          userId,
        })
        .then(mapResponseToPayload),
  },
};
