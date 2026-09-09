<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->nullable();
            $table->string('tagline')->nullable();
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('city')->default('Dhaka');
            $table->string('state')->default('Dhaka North');
            $table->string('area_name');
            $table->decimal('price', 15, 2);
            $table->string('price_unit')->nullable();
            $table->string('listing_type')->default('Sale');
            $table->string('property_type')->default('Flat');
            $table->string('status')->default('Active');
            $table->integer('bedrooms')->default(0);
            $table->integer('bathrooms')->default(0);
            $table->integer('balconies')->default(0);
            $table->integer('square_footage')->nullable();
            $table->decimal('land_size', 8, 2)->nullable();
            $table->string('land_unit')->nullable();
            $table->integer('parking')->default(0);
            $table->integer('floor_number')->nullable();
            $table->integer('total_floors')->nullable();
            $table->string('facing')->nullable();
            $table->string('completion_status')->default('Ready');
            $table->integer('year_built')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_rajuk_approved')->default(false);
            $table->boolean('is_verified')->default(true);
            $table->boolean('has_open_house')->default(false);
            $table->decimal('latitude', 10, 7)->nullable();
            $table->decimal('longitude', 10, 7)->nullable();
            $table->unsignedBigInteger('agent_id')->nullable();
            $table->json('images')->nullable();
            $table->json('amenities')->nullable();
            $table->json('documents_verified')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
