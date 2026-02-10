export type InviteType = {
  /** Unique token identifying this invite */
  token: string;

  /** Date when the invite was created */
  createdAt: Date;

  /** Date when the invite expires */
  expiresAt: Date;

  /** Maximum number of times this invite can be used */
  maxUses: number;

  /** ID of the user who created the invite */
  createdByUserId?: string;

  /** URL to redirect after the user upgrades */
  redirectToAfterUpgrade: string;

  /** Whether to share the inviter's name with the invitee */
  shareInviterName: boolean;

  /** Optional email associated with this invite */
  email?: string;

  /** Role assigned when the invite is used */
  role: string;
};

export type InviteUseType = {
  /** ID of the invite being used */
  inviteId: string;

  /** Date when the invite was used */
  usedAt: Date;

  /** Optional ID of the user who used the invite */
  usedByUserId?: string;
};
