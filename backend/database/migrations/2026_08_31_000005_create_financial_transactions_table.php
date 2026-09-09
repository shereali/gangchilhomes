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
        Schema::create('financial_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('deal_code')->unique();
            $table->string('property_title');
            $table->string('buyer_name');
            $table->decimal('transacted_value', 15, 2);
            $table->decimal('commission_amount', 15, 2);
            $table->string('escrow_bank')->default('BRAC Bank Escrow');
            $table->string('status')->default('Settled');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financial_transactions');
    }
};
