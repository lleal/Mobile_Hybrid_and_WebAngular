<?php
use Phalcon\Validation;
use Phalcon\Mvc\Model\Validator\Email as EmailValidator;

class Clientes extends \Phalcon\Mvc\Model
{

    /**
     *
     * @var integer
     */
    public $id;

    /**
     *
     * @var string
     */
    public $id_cliente;

    /**
     *
     * @var string
     */
    public $nombre;

    /**
     *
     * @var string
     */
    public $apellido;

    /**
     *
     * @var string
     */
    public $fecha_nac;

    /**
     *
     * @var string
     */
    public $email;

    /**
     * Validations and business logic
     */
    public function validation()
    {

         $validator = new Validation();

        $validator->add(
            'email',
            new EmailValidator()
        );

        return $this->validate($validator);
    }

    /**
     * Initialize method for model.
     */
    public function initialize()
    {
        $this->setSchema("public");
    }

    /**
     * Independent Column Mapping.
     * Keys are the real names in the table and the values their names in the application
     *
     * @return array
     */
    public function columnMap()
    {
        return array(
            'id' => 'id', 
            'id_cliente' => 'id_cliente', 
            'nombre' => 'nombre', 
            'apellido' => 'apellido', 
            'fecha_nac' => 'fecha_nac', 
            'email' => 'email'
        );
    }

}
