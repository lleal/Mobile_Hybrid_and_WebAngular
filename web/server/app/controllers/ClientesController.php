<?php

class ClientesController extends \Phalcon\Mvc\Controller
{

    public function indexAction()
    {

    }
    private $_clientes = array();
    public function getAction()
    {
    	$this->view->disable();
    	if($this->request->isGet() == true)
    	{
    		$clientes = Clientes::find();
    		foreach($clientes as $cliente)
    		{
    			$this->_clientes[] = $cliente;
    		}
    		$this->response->setJsonContent(array("clientes" => $this->_clientes));
    		$this->response->setStatusCode(200, "OK");
    		$this->response->send();
    	}
    	else
    	{
    		$this->response->setStatusCode(404, "Not Found");
    	}
    }
    public function insertAction()
    {        
        $config = array(
        'host'        => 'localhost',
        'username'    => 'postgres',
        'password'    => '1234',
        'dbname'      => 'db_prueba_impacto',        
        'schema'      => 'public');

        $connection = new \Phalcon\Db\Adapter\Pdo\Postgresql($config);
        
        $sSQL = "insert into clientes(id, id_cliente, nombre, apellido, fecha_nac, email) values(nextval('clientes_id_seq'::regclass),?,?,?,?,?)";
        $client =$this->request->getJsonRawBody();
        $statement = $connection->execute($sSQL, array($client->id_cliente, $client->nombre, $client->apellido, $client->fecha_nac, $client->email));
        $connection->close();
    }
    public function updateAction()
    {        
        $config = array(
        'host'        => 'localhost',
        'username'    => 'postgres',
        'password'    => '1234',
        'dbname'      => 'db_prueba_impacto',        
        'schema'      => 'public');

        $connection = new \Phalcon\Db\Adapter\Pdo\Postgresql($config);
        
        $sSQL = "update clientes set id_cliente = ?, nombre = ?, apellido = ?, fecha_nac = ?, email = ? where id = ?";
        $client =$this->request->getJsonRawBody();
        $statement = $connection->execute($sSQL, array($client->id_cliente, $client->nombre, $client->apellido, $client->fecha_nac, $client->email, $client->id));
        $connection->close();
    }
    public function deleteAction()
    {        
        $config = array(
        'host'        => 'localhost',
        'username'    => 'postgres',
        'password'    => '1234',
        'dbname'      => 'db_prueba_impacto',        
        'schema'      => 'public');

        $connection = new \Phalcon\Db\Adapter\Pdo\Postgresql($config);
        
        $sSQL = "delete from clientes where id = ?";
        $client =$this->request->getJsonRawBody();
        $statement = $connection->execute($sSQL, array($client->id));
        $connection->close();
    }
}

