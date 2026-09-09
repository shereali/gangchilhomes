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
        Schema::create('viewings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->string('contact_method')->default('WhatsApp');
            $table->unsignedBigInteger('property_id')->nullable();
            $table->string('property_title');
            $table->date('scheduled_date');
            $table->string('scheduled_time');
            $table->boolean('vip_pickup')->default(false);
            $table->string('pickup_location')->nullable();
            $table->string('assigned_agent')->nullable();
            $table->string('status')->default('Confirmed');
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('viewings');
    }
};
