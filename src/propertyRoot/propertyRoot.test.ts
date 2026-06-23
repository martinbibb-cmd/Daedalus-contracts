import {
  AccessGrantSchema,
  AuthoritativeTwinSchema,
  CustodianChangeSchema,
  DaedalusPackageV4Schema,
  EvidenceReferenceMetadataSchema,
  PropertyIdentitySchema,
  PropertyRootContractAuthority,
  PropertyTwinSchema,
  SurveyCaptureSessionSchema,
  WorkingTwinSchema,
  identifyDaedalusPackageForUpgrade,
  normalizeLegacyV3ToPropertyRootShell,
} from "./propertyRoot";

const propertyIdentity = {
  property_id: "property:DAE-001",
  property_ref: "DAE-001",
};

const workingTwin = {
  property_id: "property:DAE-001",
  property_ref: "DAE-001",
  twin_ref: "working-twin:visit-001",
};

describe("property-root contracts", () => {
  it("allows Property to exist without users", () => {
    const parsed = PropertyIdentitySchema.parse(propertyIdentity);

    expect(parsed.kind).toBe("PropertyIdentity");
    expect(parsed.can_exist_without_users).toBe(true);
    expect(PropertyRootContractAuthority.propertyIsRootIdentity).toBe(true);
    expect(PropertyRootContractAuthority.usersOrganisationsWorkspacesBillingAndSubscriptionsAreNotRoots).toBe(true);
  });

  it("does not allow Twin without Property", () => {
    expect(() =>
      PropertyTwinSchema.parse({
        twin_ref: "twin-001",
        authoritative: false,
        working: true,
      })
    ).toThrow();
  });

  it("makes WorkingTwin subordinate to Property and not authoritative", () => {
    const parsed = WorkingTwinSchema.parse(workingTwin);

    expect(parsed.ownership_root).toBe("PropertyIdentity");
    expect(parsed.property_id).toBe(propertyIdentity.property_id);
    expect(parsed.working).toBe(true);
    expect(parsed.authoritative).toBe(false);
  });

  it("makes AuthoritativeTwin subordinate to Property", () => {
    const parsed = AuthoritativeTwinSchema.parse({
      property_id: "property:DAE-001",
      property_ref: "DAE-001",
      twin_ref: "authoritative-twin:DAE-001",
      committed_at: "2026-06-23T10:00:00Z",
    });

    expect(parsed.ownership_root).toBe("PropertyIdentity");
    expect(parsed.authoritative).toBe(true);
    expect(parsed.working).toBe(false);
  });

  it("links SurveyCaptureSession to Property and WorkingTwin", () => {
    const parsed = SurveyCaptureSessionSchema.parse({
      property_id: "property:DAE-001",
      property_ref: "DAE-001",
      session_ref: "visit-001",
      working_twin_ref: "working-twin:visit-001",
    });

    expect(parsed.temporary).toBe(true);
    expect(parsed.authoritative).toBe(false);
    expect(parsed.working_twin_ref).toBe(workingTwin.twin_ref);
  });

  it("links Evidence metadata to Property/Twin/Session and external media", () => {
    const parsed = EvidenceReferenceMetadataSchema.parse({
      property_id: "property:DAE-001",
      property_ref: "DAE-001",
      evidence_ref: "evidence-photo-001",
      twin_ref: "working-twin:visit-001",
      session_ref: "visit-001",
      media_ref: "r2://evidence/photo-001.jpg",
      media_type: "photo",
      content_type: "image/jpeg",
    });

    expect(parsed.binary_embedded).toBe(false);
    expect(parsed.media_ref).toBe("r2://evidence/photo-001.jpg");
    expect(parsed.authoritative_truth).toBe(false);
  });

  it("validates DaedalusPackage v4", () => {
    const parsed = DaedalusPackageV4Schema.parse({
      packageVersion: 4,
      packageId: "pkg-v4-001",
      exportedAt: "2026-06-23T10:00:00Z",
      propertyIdentity,
      workingTwin,
      surveyCaptureSession: {
        property_id: "property:DAE-001",
        property_ref: "DAE-001",
        session_ref: "visit-001",
        working_twin_ref: "working-twin:visit-001",
      },
      evidence: [
        {
          property_id: "property:DAE-001",
          property_ref: "DAE-001",
          evidence_ref: "evidence-photo-001",
          twin_ref: "working-twin:visit-001",
          session_ref: "visit-001",
          media_ref: "r2://evidence/photo-001.jpg",
        },
      ],
      observations: [
        {
          property_id: "property:DAE-001",
          property_ref: "DAE-001",
          observation_ref: "obs-001",
          twin_ref: "working-twin:visit-001",
          tag: "area",
          evidence_refs: ["evidence-photo-001"],
        },
      ],
    });

    expect(parsed.packageVersion).toBe(4);
    expect(parsed.propertyIdentity.root_entity).toBe("property");
  });

  it("identifies or normalises legacy v3 package shape for upgrade", () => {
    const legacy = {
      packageVersion: 3,
      packageId: "pkg-v3-001",
      visitId: "visit-001",
      propertyRef: "DAE-001",
      observations: [],
    };

    expect(identifyDaedalusPackageForUpgrade(legacy)).toMatchObject({
      status: "legacy_v3_upgrade_required",
      property_ref: "DAE-001",
    });

    const normalized = normalizeLegacyV3ToPropertyRootShell(legacy);
    expect(normalized.packageVersion).toBe(4);
    expect(normalized.propertyIdentity.property_ref).toBe("DAE-001");
    expect(normalized.workingTwin?.authoritative).toBe(false);
  });

  it("keeps AccessGrant and CustodianChange as attachment points", () => {
    const grant = AccessGrantSchema.parse({
      property_id: "property:DAE-001",
      property_ref: "DAE-001",
      grant_ref: "grant-001",
      subject_type: "user",
      subject_ref: "user-001",
    });
    const change = CustodianChangeSchema.parse({
      property_id: "property:DAE-001",
      property_ref: "DAE-001",
      change_ref: "custodian-change-001",
      next_custodian_ref: "custodian-002",
    });

    expect(grant.attachment_point_only).toBe(true);
    expect(grant.ownership_root).toBe("PropertyIdentity");
    expect(change.attachment_point_only).toBe(true);
    expect(change.transfers_twin_ownership).toBe(false);
  });
});
