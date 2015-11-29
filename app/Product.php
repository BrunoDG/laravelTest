<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Modelo responsável pelos ítens da tabela 'produtos'
 * @param int $id - Id do produto
 * @param string $nome - Nome do produto
 * @param string $sku - SKU único do produto
 * @param int $stock - quantidade do produto no estoque (vendido / comprado)
 */

class Product extends Model
{
  /**
   * @inheritdoc
   */
    protected $table = 'produto';

  /**
     * @inheritdoc
     */
    protected $fillable = ['sku','name','stock'];
}
