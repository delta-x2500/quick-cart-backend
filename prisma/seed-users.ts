import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with test users...\n");

  // Super Admin credentials
  const superAdminEmail = "superadmin@quickcart.com";
  const superAdminPassword = "SuperAdmin123!";

  // Vendor credentials
  const vendorEmail = "vendor@quickcart.com";
  const vendorPassword = "Vendor123!";

  // Check if super admin exists
  const existingSuperAdmin = await prisma.user.findUnique({
    where: { email: superAdminEmail },
  });

  if (existingSuperAdmin) {
    console.log("⚠️  Super Admin already exists:", superAdminEmail);
  } else {
    const hashedPassword = await bcrypt.hash(superAdminPassword, 10);

    await prisma.user.create({
      data: {
        name: "Super Admin",
        email: superAdminEmail,
        password: hashedPassword,
        role: "super_admin",
        isApproved: true,
      },
    });

    console.log("✅ Super Admin created successfully!");
    console.log("   📧 Email:", superAdminEmail);
    console.log("   🔑 Password:", superAdminPassword);
  }

  // Check if vendor exists
  const existingVendor = await prisma.user.findUnique({
    where: { email: vendorEmail },
  });

  if (existingVendor) {
    console.log("⚠️  Test Vendor already exists:", vendorEmail);
  } else {
    const hashedPassword = await bcrypt.hash(vendorPassword, 10);

    // Create vendor user
    const vendor = await prisma.user.create({
      data: {
        name: "Test Vendor",
        email: vendorEmail,
        password: hashedPassword,
        role: "seller",
        businessName: "Test Vendor Store",
        phoneNumber: "+1234567890",
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        isApproved: true, // Pre-approved for testing
      },
    });

    // Create store for the vendor
    await prisma.store.create({
      data: {
        name: "Test Vendor Store",
        businessName: "Test Vendor Store",
        phoneNumber: "+1234567890",
        email: vendorEmail,
        address: "123 Test Street",
        city: "Test City",
        state: "Test State",
        ownerId: vendor.id,
      },
    });

    console.log("✅ Test Vendor created successfully!");
    console.log("   📧 Email:", vendorEmail);
    console.log("   🔑 Password:", vendorPassword);
    console.log("   ✓  Status: Pre-approved");
  }

  console.log("\n🎉 Seeding complete!");
  console.log("\n📝 Test Credentials:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("Super Admin:  superadmin@quickcart.com / SuperAdmin123!");
  console.log("Vendor:       vendor@quickcart.com / Vendor123!");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
