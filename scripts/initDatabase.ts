import { db } from '@/lib/firebaseAdmin';
import { LESOTHO_PRODUCTS, LESOTHO_CUSTOMERS } from '../data/sampleData';

const initDatabase = async () => {
  try {
    console.log('🚀 Starting database initialization...');

    // Check if products already exist to avoid duplicates
    const productsSnapshot = await db.collection('products').limit(1).get();
    if (!productsSnapshot.empty) {
      console.log('✅ Products already exist in database. Skipping initialization.');
      return;
    }

    // Add products
    console.log('📦 Adding products...');
    for (const product of LESOTHO_PRODUCTS) {
      await db.collection('products').add({
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Added product: ${product.name}`);
    }

    // Add customers
    console.log('👥 Adding customers...');
    for (const customer of LESOTHO_CUSTOMERS) {
      await db.collection('customers').add({
        ...customer,
        loyaltyPoints: 0,
        totalSpent: 0,
        lastVisit: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log(`✅ Added customer: ${customer.firstName} ${customer.lastName}`);
    }

    console.log('\n🎉 Database initialized successfully with sample data!');
    console.log(`📊 Added ${LESOTHO_PRODUCTS.length} products and ${LESOTHO_CUSTOMERS.length} customers`);

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

// Run the initialization
initDatabase()
  .then(() => {
    console.log('✨ Initialization script completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Initialization script failed:', error);
    process.exit(1);
  });