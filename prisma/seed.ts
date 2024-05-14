import {
  PrismaClient,
  USER_ROLES,
  LISTING_STATUS,
  CURRENCY_CODES,
} from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  try {
    // Define user profiles data
    const userData = [
      {
        userSub: "ac2744ae-1132-48da-8925-33950851dd81",
        email: "morrison.neil.v+landlord3@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.LANDLORD,
      },
      {
        userSub: "38dc9799-5745-490c-ad53-3ca27d85dd48",
        email: "morrison.neil.v+landlord2@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.LANDLORD,
      },
      {
        userSub: "2fd4836b-6f59-4565-9f5d-7aadcab36fe5",
        email: "morrison.neil.v+landlord@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.LANDLORD,
      },
      {
        userSub: "514374a7-c70f-4b50-bcd5-9cbbd71ec582",
        email: "morrison.neil.v+tenant@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.TENANT,
      },
      {
        userSub: "f7c0f260-8f28-4cba-a2f4-9e7ccb4158d6",
        email: "morrison.neil.v+tenant2@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.TENANT,
      },
      {
        userSub: "dfaa40d1-b76b-43e3-a8f2-3ac661141d9d",
        email: "morrison.neil.v+tenant3@gmail.com",
        givenName: "Neil",
        familyName: "Morrison",
        role: USER_ROLES.TENANT,
      },
    ];

    // Generate random addresses within Toronto
    const addressesData = Array.from({ length: 15 }, () => {
      const city = "Toronto";
      const latitude = faker.location.latitude({
        max: -79.0,
        min: -79.6,
        precision: 6,
      });
      const longitude = faker.location.longitude({
        max: 44.0,
        min: 43.3,
        precision: 6,
      });

      return {
        streetName: faker.location.street(),
        civicNumber: faker.location.buildingNumber(),
        city,
        country: "Canada",
        postalCode: faker.location.zipCode("?#? #?#"),
        latitude,
        longitude,
      };
    });

    // Create user profiles
    const generateAvatar = () => faker.image.avatar();
    const userProfiles = await Promise.all(
      userData.map((user) =>
        prisma.userProfile.create({
          data: {
            userSub: user.userSub,
            email: user.email,
            givenName: faker.person.firstName(),
            familyName: faker.person.lastName(),
            role: user.role,
            avatar: generateAvatar(),
          },
        })
      )
    );

    // Create addresses
    const addresses = await Promise.all(
      addressesData.map((address) =>
        prisma.address.create({
          data: {
            streetName: address.streetName,
            civicNumber: address.civicNumber,
            city: address.city,
            country: address.country,
            postalCode: address.postalCode,
            latitude: address.latitude,
            logitude: address.longitude,
          },
        })
      )
    );

    // Select a random landlord profile
    const landlordIndex = Math.floor(Math.random() * userProfiles.length);
    const selectedLandlord = userProfiles[landlordIndex];

    // Create listings with associated prices
    const realEstateListings = [
      "Luxurious Villa with Stunning Ocean Views",
      "Charming Historic Home in Downtown District",
      "Modern Condo with City Skyline Panorama",
      "Spacious Family House with Large Backyard",
      "Elegant Penthouse with Private Terrace",
      "Cozy Cottage Retreat Near Scenic Lake",
      "Contemporary Loft in Trendy Urban Neighborhood",
      "Spectacular Mountain Chalet with Ski-in/Ski-out Access",
      "Secluded Ranch Property with Acres of Land",
      "Beachfront Bungalow Perfect for Relaxing Getaways",
    ];

    const randomIndex = () =>
      Math.floor(Math.random() * realEstateListings.length);

    const listings = await Promise.all(
      addresses.map(async (address) => {
        const listing = await prisma.listing.create({
          data: {
            title: realEstateListings[randomIndex()],
            description: faker.lorem.paragraph(),
            status: LISTING_STATUS.IMMEDIATE,
            thumbnail: "https://unsplash.it/125/94",
            photoUrls: [
              "https://unsplash.it/512/384",
              "https://unsplash.it/512/384",
              "https://unsplash.it/512/384",
              "https://unsplash.it/512/384",
              "https://unsplash.it/512/384",
              "https://unsplash.it/512/384",
            ],
            userProfileId: selectedLandlord.id,
            addressId: address.id,
          },
        });

        // Create a random price for the listing
        const amount = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;
        await prisma.listingPrice.create({
          data: {
            amount: amount,
            currencyCode: CURRENCY_CODES.CAD,
            addressId: address.id,
            listingId: listing.id,
          },
        });

        return listing;
      })
    );

    console.log("Seed script executed successfully.");
  } catch (error) {
    console.error("Error executing seed script:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();