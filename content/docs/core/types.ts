// To silence TypeScript errors
// @ts-nocheck

export type InviteOptions = {
  /**
   * A function to generate the date
   * @default () => new Date()
   */
  getDate?: () => Date;
  /**
   * A function that runs before a user creates an invite
   *
   * @default true
   */
  canCreateInvite?:
    | ((data: {
        invitedUser: {
          email?: string;
          role: string;
        };
        inviterUser: UserWithRole;
      }) => boolean)
    | boolean;
  /**
   * A function that runs before a user accepts an invite
   *
   * @default true
   */
  canAcceptInvite?:
    | ((data: { invitedUser: UserWithRole; newAccount: boolean }) => boolean)
    | boolean;
  /**
   * A function to generate a custom token
   */
  generateToken?: () => string;
  /**
   * The default token type, can be:
   * - Token: () => generateId(24)
   * - Code: () => generateRandomString(6, "0-9", "A-Z")
   * - Custom: generateToken(invitedUser) (needs options.generateToken)
   * @default "token"
   */
  defaultTokenType?: TokensType;
  /**
   * The default redirect to make the user to sign up
   *
   * @default "/auth/sign-up"
   */
  defaultRedirectToSignUp?: string;
  /**
   * The default redirect to make the user to sign up
   *
   * @default "/auth/sign-in"
   */
  defaultRedirectToSignIn?: string;
  /**
   * The default redirect after upgrading role (or logging in with an invite)
   */
  defaultRedirectAfterUpgrade: string;
  /**
   * Whether the inviter's name should be shared with the invitee by default.
   *
   * When enabled, the person receiving the invitation will see
   * the name of the user who created the invitation.
   *
   * @default true
   */
  defaultShareInviterName?: boolean;
  /**
   * Max token uses
   * @default 1
   */
  defaultMaxUses: number;
  /**
   * How should the sender receive the token by default.
   * (sender only receives a token if no email is provided)
   *
   * @default "token"
   */
  defaultSenderResponse?: "token" | "url";
  /**
   * Where should we redirect the user by default?
   * (only if no email is provided)
   *
   * @default "signUp"
   */
  defaultSenderResponseRedirect?: "signUp" | "signIn";
  /**
   * Send user invitation email
   */
  sendUserInvitation?: (
    data: {
      email: string;
      name?: string;
      role: string;
      url: string;
      token: string;
      newAccount: boolean;
    },
    request?: Request,
  ) => Promise<void>;
  /**
   * Send user role upgrade email
   *
   * @deprecated Use `sendUserInvitation` instead.
   */
  sendUserRoleUpgrade?: (
    data: {
      email: string;
      role: string;
      url: string;
      token: string;
    },
    request?: Request,
  ) => Promise<void>;
  /**
   * Number of seconds the invitation token is
   * valid for.
   * @default 3600 // (1 hour)
   */
  invitationTokenExpiresIn?: number;
  /**
   * Maximum age (in seconds) for the invitation cookie.
   * This controls how long users have to complete the login flow
   * before activating the token if they are not logged in.
   *
   * @default 600 // (10 minutes)
   */
  inviteCookieMaxAge?: number;
  /**
   * A callback function that is triggered
   * when a invite is used.
   */
  onInvitationUsed?: (
    data: {
      invitedUser: UserWithRole;
      newUser: UserWithRole;
      newAccount: boolean;
    },
    request?: Request,
  ) => Promise<void>;
  /**
   * Custom schema for the invite plugin
   */
  schema?: InferOptionSchema<InviteSchema> | undefined;
};

export type InviteType = {
  token: string;
  createdByUserId: string;
  createdAt: Date;
  expiresAt: Date;
  maxUses: number;
  redirectToAfterUpgrade: string;
  shareInviterName: boolean;
  email?: string;
  role: string;
};

export type TokensType = "token" | "code" | "custom";

export type InferOptionSchema<S> =
  S extends Record<string, { fields: infer Fields }>
    ? {
        [K in keyof S]?: {
          modelName?: string | undefined;
          fields?:
            | {
                [P in keyof Fields]?: string;
              }
            | undefined;
        };
      }
    : never;

export const schema = {
  invite: {
    fields: {
      token: { type: "string", unique: true },
      createdAt: { type: "date" },
      expiresAt: { type: "date", required: true },
      maxUses: { type: "number", required: true },
      createdByUserId: {
        type: "string",
        references: { model: "user", field: "id", onDelete: "set null" },
      },
      redirectToAfterUpgrade: { type: "string", required: true },
      shareInviterName: { type: "boolean", required: true },
      email: { type: "string", required: false },
      role: { type: "string", required: true },
    },
  },
  inviteUse: {
    fields: {
      inviteId: {
        type: "string",
        required: true,
        references: { model: "invite", field: "id", onDelete: "set null" },
      },
      usedAt: { type: "date", required: true },
      usedByUserId: {
        type: "string",
        required: false,
        references: { model: "user", field: "id", onDelete: "set null" },
      },
    },
  },
};

export type InviteSchema = typeof schema;
